<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return $tables = Schema::getTables();
});
