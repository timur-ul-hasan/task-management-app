<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;


class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'status',
        'description',
        'user_id',
    ];

   
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'task_permission')
                    ->withPivot('permission')
                    ->withTimestamps();
    }
}
