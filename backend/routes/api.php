<?php

use App\Http\Controllers\Api\ApplicationController;
use App\Http\Controllers\Api\JobController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    // Jobs
    Route::get('/jobs', [JobController::class , 'index']);
    Route::get('/jobs/{id}', [JobController::class , 'show']);
    Route::post('/jobs', [JobController::class , 'store']);
    Route::delete('/jobs/{id}', [JobController::class , 'destroy']);

    // Applications
    Route::get('/applications', [ApplicationController::class , 'index']);
    Route::post('/applications', [ApplicationController::class , 'store']);
});

// Also register without v1 prefix for convenience
Route::get('/jobs', [JobController::class , 'index']);
Route::get('/jobs/{id}', [JobController::class , 'show']);
Route::post('/jobs', [JobController::class , 'store']);
Route::delete('/jobs/{id}', [JobController::class , 'destroy']);
Route::get('/applications', [ApplicationController::class , 'index']);
Route::post('/applications', [ApplicationController::class , 'store']);
