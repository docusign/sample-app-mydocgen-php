<?php

namespace App\DTO\Scenario3;

class Survey
{
    public readonly string $jobStatus;
    public readonly string $workedHereBefore;
    public readonly string $appliedToAvailablePosition;
    public readonly string $stillEmployed;
    public readonly null|string $startDate;
    public readonly null|string $lastEmployedDate;
    public readonly null|string $leavingReason;
    public readonly null|string $leavingDescription;
    public readonly string $responsibility;

    public function __construct(array $params)
    {
        $this->jobStatus = sanitize($params['job_status']);
        $this->workedHereBefore = sanitize($params['worked_here_before']);
        $this->appliedToAvailablePosition = sanitize($params['applied_to_available_position']);
        $this->stillEmployed = sanitize($params['still_employed']);
        $this->startDate = $params['start_date'] ?? null;
        $this->lastEmployedDate = $params['last_employed_date'] ?? null;
        $this->leavingReason = sanitize($params['leaving']['reason'] ?? null);
        $this->leavingDescription = sanitize($params['leaving']['description'] ?? null);
        $this->responsibility = sanitize($params['responsibility']);
    }
}
