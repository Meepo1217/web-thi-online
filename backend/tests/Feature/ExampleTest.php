<?php

namespace Tests\Feature;

// use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    /**
     * A basic test example.
     */
    public function test_the_application_returns_a_successful_response(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    public function test_api_test_connection_returns_success(): void
    {
        $response = $this->getJson('/api/test-connection');

        $response->assertStatus(200)
            ->assertJson([
                'status' => 'success',
            ]);
    }
}
