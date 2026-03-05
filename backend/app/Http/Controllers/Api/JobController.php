<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\JobListing;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class JobController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = JobListing::query();

        if ($request->filled('search')) {
            $s = $request->search;
            $query->where(function ($q) use ($s) {
                $q->where('title', 'like', "%{$s}%")
                    ->orWhere('company', 'like', "%{$s}%")
                    ->orWhere('description', 'like', "%{$s}%");
            });
        }

        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }

        if ($request->filled('location')) {
            $query->where('location', 'like', "%{$request->location}%");
        }

        if ($request->boolean('is_featured')) {
            $query->where('is_featured', true);
        }

        $perPage = $request->get('per_page', 20);
        $jobs = $query->latest()->paginate($perPage);

        return response()->json($jobs);
    }

    public function show(string $id): JsonResponse
    {
        $job = JobListing::find($id);

        if (!$job) {
            return response()->json(['message' => 'Job not found'], 404);
        }

        return response()->json($job);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'company' => 'required|string|max:255',
            'company_logo' => 'nullable|string|max:500',
            'location' => 'required|string|max:255',
            'category' => 'required|string|max:100',
            'type' => 'required|string|max:100',
            'description' => 'required|string',
        ]);

        $job = JobListing::create($validated);

        return response()->json($job, 201);
    }

    public function destroy(string $id): JsonResponse
    {
        $job = JobListing::find($id);

        if (!$job) {
            return response()->json(['message' => 'Job not found'], 404);
        }

        $job->delete();

        return response()->json(['message' => 'Job deleted successfully']);
    }
}
