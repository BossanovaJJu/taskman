<?php

namespace App\Http\Controllers;

use App\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::where('is_completed', false)
            ->orderBy('created_at', 'desc')
            ->withCount(['tasks' => function ($query) {
                $query->where('is_completed', false);
            }])
            ->get();
        return $projects->toJson();

    }
    public function store(Request $request)
    {
        $validateData = $request->validate([
            'title' => 'required',
            'description' => 'required',
        ]);

        $project = Project::create([
            'title' => $validateData['title'],
            'description' => $validateData['description'],
        ]);

        return response()->json('Project Created!');
    }
    public function show($id)
    {
        $project = Project::with(['tasks' => function($query){
            $query->where('is_completed', false);
        }])->find($id);

        return $project->toJson();
    }
    public function markAsCompleted(Project $project)
    {
        $project->is_completed = true;
        $project->update();

        return response()->json('Project updated!');
    }
}
