<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    public function create(Request $request)
    {
        //dd(User::get());
        try{
            $this->validate($request, [
                'first_name' => 'required|alpha',
                'last_name' => ['required',"regex:/^[a-zA-Z'-]+$/"],
                'email' => 'required|email|unique:users,email',
                'zip_code' => 'required',
                'us_state' => 'required'
            ]);
            //dd($request->all());
            $user = User::createUser($request->all());
            
            return $this->sendResponse(200 , 'Thank you for your submission', $user );
        }catch (ValidationException $vex){
            return $this->sendResponse(403, $vex->errors());
        }
        catch (Exception $ex) {
            //dd($ex);
            return $this->sendErrorResponse($ex->getMessage());
        }
        
    }
}
