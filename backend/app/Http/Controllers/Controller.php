<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;

class Controller extends BaseController
{
    public function sendResponse($status, $message , $data = null){
        return response()->json([
                'status'=>$status,
                'message'=> $message,
                'data' => $data
            ], $status);
    }

    public function sendErrorResponse($message){
        return response()->json([
            'status'=>500,
            'message'=> $message
        ], 500);
    }
}
