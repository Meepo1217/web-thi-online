<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        // Bind interfaces to implementations here.
        // Example:
        // $this->app->bind(
        //     \App\Repositories\Contracts\UserRepositoryInterface::class,
        //     \App\Repositories\Eloquent\UserRepository::class
        // );
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
