<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Application extends Model
{
    protected $fillable = [
        'job_listing_id',
        'name',
        'email',
        'resume_link',
        'cover_note',
    ];

    public function job(): BelongsTo
    {
        return $this->belongsTo(JobListing::class);
    }
}
