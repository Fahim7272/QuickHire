<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class JobListing extends Model
{
    protected $fillable = [
        'title',
        'company',
        'company_logo',
        'location',
        'category',
        'type',
        'description',
    ];

    public function applications(): HasMany
    {
        return $this->hasMany(Application::class);
    }
}
