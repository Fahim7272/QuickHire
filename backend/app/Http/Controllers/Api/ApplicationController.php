<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Application;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ApplicationController extends Controller
{
    public function index(): JsonResponse
    {
        $applications = Application::with('job')->latest()->get();
        return response()->json($applications);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'job_listing_id' => 'required|exists:job_listings,id',
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'resume_link' => 'nullable|string|max:500',
            'cover_note' => 'nullable|string',
        ]);

        $application = Application::create($validated);

        return response()->json($application, 201);
    }
}
