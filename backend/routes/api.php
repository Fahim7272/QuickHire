<?php

use App\Http\Controllers\Api\ApplicationController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\JobController;
use Illuminate\Support\Facades\Route;

// ── Public routes ────────────────────────────────────────────────────────────

// Auth
Route::post('/register', [AuthController::class , 'register']);
Route::post('/login', [AuthController::class , 'login']);

// Jobs (public read)
Route::get('/jobs', [JobController::class , 'index']);
Route::get('/jobs/{id}', [JobController::class , 'show']);

// Admin job management (no auth for demo)
Route::post('/jobs', [JobController::class , 'store']);
Route::delete('/jobs/{id}', [JobController::class , 'destroy']);

// Applications (public post — anyone can submit; admin read)
Route::post('/applications', [ApplicationController::class , 'store']);
Route::get('/applications', [ApplicationController::class , 'index']);

// ── Protected routes (Sanctum token required) ────────────────────────────────
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class , 'logout']);
    Route::get('/me', [AuthController::class , 'me']);
    Route::put('/me', [AuthController::class , 'updateProfile']);
    Route::post('/me/photo', [AuthController::class , 'uploadPhoto']);
    Route::get('/me/applications', [AuthController::class , 'myApplications']);
});

// ── v1 prefix aliases (keep backwards compat) ───────────────────────────────
Route::prefix('v1')->group(function () {
    Route::get('/jobs', [JobController::class , 'index']);
    Route::get('/jobs/{id}', [JobController::class , 'show']);
    Route::post('/jobs', [JobController::class , 'store']);
    Route::delete('/jobs/{id}', [JobController::class , 'destroy']);
    Route::get('/applications', [ApplicationController::class , 'index']);
    Route::post('/applications', [ApplicationController::class , 'store']);
});
