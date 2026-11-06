<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Đảm bảo không viết sai chính tả đường dẫn: /test-connection
Route::get('/test-connection', function () {
    return response()->json([
        'status' => 'success',
        'message' => 'Tuyệt vời! React đã kết nối thành công với Laravel API.'
    ]);
});