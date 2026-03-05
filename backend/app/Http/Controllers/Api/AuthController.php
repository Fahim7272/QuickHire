<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Application;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:users,email',
            'password' => 'required|string|min:6|confirmed',
        ]);
        $user = User::create($validated);
        $token = $user->createToken('qh-token')->plainTextToken;
        return response()->json(['token' => $token, 'user' => $this->formatUser($user)], 201);
    }

    public function login(Request $request): JsonResponse
    {
        $request->validate(['email' => 'required|email', 'password' => 'required|string']);
        $user = User::where('email', $request->email)->first();
        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages(['email' => ['The provided credentials are incorrect.']]);
        }
        $user->tokens()->where('name', 'qh-token')->delete();
        $token = $user->createToken('qh-token')->plainTextToken;
        return response()->json(['token' => $token, 'user' => $this->formatUser($user)]);
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out successfully']);
    }

    public function me(Request $request): JsonResponse
    {
        return response()->json($this->formatUser($request->user()));
    }

    public function updateProfile(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name'     => 'sometimes|string|max:255',
            'title'    => 'nullable|string|max:255',
            'bio'      => 'nullable|string|max:1000',
            'skills'   => 'nullable|array',
            'skills.*' => 'string|max:100',
        ]);
        $request->user()->update($validated);
        return response()->json($this->formatUser($request->user()->fresh()));
    }

    public function uploadPhoto(Request $request): JsonResponse
    {
        $request->validate(['photo' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:5120']);
        $user = $request->user();
        if ($user->profile_photo) {
            Storage::disk('public')->delete($user->profile_photo);
        }
        $path = $request->file('photo')->store('profile-photos', 'public');
        $user->update(['profile_photo' => $path]);
        return response()->json([
            'profile_photo'     => $path,
            'profile_photo_url' => Storage::disk('public')->url($path),
        ]);
    }

    public function myApplications(Request $request): JsonResponse
    {
        $apps = Application::with('jobListing')
            ->where('email', $request->user()->email)
            ->latest()->get()
            ->map(fn($app) => [
                'id'           => $app->id,
                'job_id'       => $app->job_listing_id,
                'title'        => $app->jobListing?->title,
                'company'      => $app->jobListing?->company,
                'company_logo' => $app->jobListing?->company_logo,
                'location'     => $app->jobListing?->location,
                'category'     => $app->jobListing?->category,
                'type'         => $app->jobListing?->type,
                'cover_note'   => $app->cover_note,
                'resume_link'  => $app->resume_link,
                'applied_at'   => $app->created_at,
                'status'       => 'Pending',
            ]);
        return response()->json($apps);
    }

    private function formatUser(User $user): array
    {
        $photoUrl = $user->profile_photo
            ? Storage::disk('public')->url($user->profile_photo) : null;
        return [
            'id'                => $user->id,
            'name'              => $user->name,
            'email'             => $user->email,
            'title'             => $user->title,
            'bio'               => $user->bio,
            'skills'            => $user->skills ?? [],
            'profile_photo'     => $user->profile_photo,
            'profile_photo_url' => $photoUrl,
            'created_at'        => $user->created_at,
        ];
    }
}