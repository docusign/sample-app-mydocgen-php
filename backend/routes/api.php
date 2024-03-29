<?php

use App\Http\Controllers\Api\Scenario1Controller;
use App\Http\Controllers\Api\Scenario2Controller;
use App\Http\Controllers\Api\Scenario3Controller;
use App\Http\Controllers\Api\LoginController;
use App\Http\Controllers\Api\LogoutController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('login', LoginController::class);

Route::group([
    'middleware' => 'auth:api',
], function () {
    Route::post('logout', LogoutController::class);

    Route::get('scenario-1/template', [Scenario1Controller::class, 'getTemplatePreviewUrl']);
    Route::post('scenario-1', [Scenario1Controller::class, 'create']);

    Route::get('scenario-2/template', [Scenario2Controller::class, 'getTemplatePreviewUrl']);
    Route::post('scenario-2', [Scenario2Controller::class, 'create']);

    Route::get('scenario-3/template', [Scenario3Controller::class, 'getTemplatePreviewUrl']);
    Route::post('scenario-3', [Scenario3Controller::class, 'create']);
});
