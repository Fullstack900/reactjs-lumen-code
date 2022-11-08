<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Lumen\Auth\Authorizable;

class User extends Model implements AuthenticatableContract, AuthorizableContract
{
    use Authenticatable, Authorizable, HasFactory;

    protected $table = 'users';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'first_name' , 'last_name' , 'email', 'zip_code', 'us_state'
    ];


    public static function createUser($user)
    {
        $model = new User();
        
        $model->first_name = $user['first_name'];    
        $model->last_name = $user['last_name'];    
        $model->email = $user['email'];    
        $model->zip_code = $user['zip_code'];    
        $model->us_state = $user['us_state'];    
        //dd(User::create($user));

        return $model->save();
    }

}
