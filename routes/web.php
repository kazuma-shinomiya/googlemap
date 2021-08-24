<?php

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


Route::get('/', 'PostController@index')->name('index');
Route::post('/store', 'PostController@store')->name('store');
Route::delete('/posts/{id}/delete', 'PostController@destroy')->name('delete');