<?php

namespace App\DTO\Scenario3;

class Appeal
{
    public readonly string $description;
    public readonly string $howToSolve;

    public function __construct(array $params)
    {
        $this->description = sanitize($params['description']);
        $this->howToSolve  = sanitize($params['how_to_solve']);
    }
}
