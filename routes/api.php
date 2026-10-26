<?php

use App\Http\Controllers\Api\Admin\AuthController as AdminAuthController;
use App\Http\Controllers\Api\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Api\Admin\OrderController as AdminOrderController;
use App\Http\Controllers\Api\Admin\SettingController as AdminSettingController;
use App\Http\Controllers\Api\Admin\TemplateController as AdminTemplateController;
use App\Http\Controllers\Api\Public\OrderController as PublicOrderController;
use App\Http\Controllers\Api\Public\SettingController as PublicSettingController;
use App\Http\Controllers\Api\Public\TemplateController as PublicTemplateController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public Customer API Routes
|--------------------------------------------------------------------------
*/
Route::prefix('templates')->group(function () {
    Route::get('/', [PublicTemplateController::class, 'index']);
    Route::get('/{slug}', [PublicTemplateController::class, 'show']);
});

Route::prefix('orders')->group(function () {
    Route::post('/', [PublicOrderController::class, 'store']);
    Route::get('/{orderRef}', [PublicOrderController::class, 'show']);
    Route::post('/{orderRef}/proof', [PublicOrderController::class, 'uploadProof']);
});

Route::get('/settings', [PublicSettingController::class, 'index']);

/*
|--------------------------------------------------------------------------
| Admin Protected API Routes (Sanctum)
|--------------------------------------------------------------------------
*/
Route::prefix('admin')->group(function () {
    Route::post('/login', [AdminAuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AdminAuthController::class, 'logout']);
        Route::get('/me', [AdminAuthController::class, 'me']);

        // Dashboard & Overview
        Route::get('/metrics', [AdminDashboardController::class, 'metrics']);

        // Orders Management
        Route::get('/orders', [AdminOrderController::class, 'index']);
        Route::get('/orders/{id}', [AdminOrderController::class, 'show']);
        Route::patch('/orders/{id}/status', [AdminOrderController::class, 'updateStatus']);
        Route::patch('/orders/{id}/notes', [AdminOrderController::class, 'updateNotes']);

        // Template Management
        Route::get('/templates', [AdminTemplateController::class, 'index']);
        Route::post('/templates', [AdminTemplateController::class, 'store']);
        Route::put('/templates/{id}', [AdminTemplateController::class, 'update']);
        Route::patch('/templates/{id}/toggle', [AdminTemplateController::class, 'toggle']);

        // Settings Management
        Route::get('/settings', [AdminSettingController::class, 'index']);
        Route::post('/settings', [AdminSettingController::class, 'update']);
    });
});
