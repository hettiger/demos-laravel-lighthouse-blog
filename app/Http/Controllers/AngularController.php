<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\View\View;
use Illuminate\Http\Request;

class AngularController extends Controller
{
    public function __invoke(Request $request): View
    {
        return view('angular');
    }
}
