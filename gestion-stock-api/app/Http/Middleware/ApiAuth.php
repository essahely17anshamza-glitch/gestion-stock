<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class ApiAuth
{
    public function handle(Request $request, Closure $next)
    {
        // Check if user is authenticated via Sanctum
        if (!auth('sanctum')->check()) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        return $next($request);
    }
}
