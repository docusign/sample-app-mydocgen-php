<?php

use App\Http\Controllers\DocuSignAuthCallbackBaseController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    echo 'success';
})->name('home');

Route::get('callback', DocuSignAuthCallbackBaseController::class)
    ->name('callback-url');
