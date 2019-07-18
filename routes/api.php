<?php

use Illuminate\Http\Request;

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

Route::get('projects', 'ProjectController@all');
Route::post('projects', 'ProjectController@store');
Route::get('projects/{id}', 'ProjectController@show');
Route::put('projects/{project}', 'ProjectController@markAsCompleted');

Route::post('projects/{project}/tasks', 'TaskController@create');
Route::put('projects/{project}/tasks/{task}', 'TaskController@markAsCompleted');

Route::post('messages/create', 'MessageController@create');
Route::get('messages/all', 'MessageController@all');

Route::post('auth/login', 'AuthController@login');
Route::post('auth/register', 'AuthController@register');
Route::get('auth/user', 'AuthController@user');
