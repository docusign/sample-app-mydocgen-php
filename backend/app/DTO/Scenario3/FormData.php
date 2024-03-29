<?php

namespace App\DTO\Scenario3;

class FormData
{
    public readonly Client $client;
    public readonly Survey $survey;
    public readonly Employer $employer;
    public readonly WorkAddress $workAddress;
    public readonly Appeal $appeal;

    public function __construct(array $params)
    {
        $this->client      = new Client($params['client']);
        $this->survey      = new Survey($params['survey']);
        $this->employer    = new Employer($params['employer']);
        $this->workAddress = new WorkAddress($params['work_address']);
        $this->appeal      = new Appeal($params['appeal']);
    }
}
