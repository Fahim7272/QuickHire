<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Application;
use App\Models\JobListing;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ApplicationController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'job_listing_id' => 'required|exists:job_listings,id',
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'resume_link' => 'required|url',
            'cover_note' => 'required|string',
        ]);

        $application = Application::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Application submitted successfully.',
            'data' => $application,
        ], 201);
    }

    public function index(): JsonResponse
    {
        $applications = Application::with('job')->latest()->get();
        return response()->json([
            'success' => true,
            'data' => $applications,
        ]);
    }
}
