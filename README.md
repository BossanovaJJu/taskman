# Using React in a Laravel application



### 참조 내용

[Using React in a Laravel application](https://blog.pusher.com/react-laravel-application) 원문 컨텐츠를 읽어보고 예제를 따라해보면서 관련 내용과 제 생각과 피드백을 적어보았습니다.  많이 부족하지만 재미있게 봐주세요!

> 여기의 글들은 제가 느끼고 생각하는 것들에 대해  이야기하는 글들이니 말투가 친절하지 않더라도 이해해주세요.^^




### 시작하기에 앞서..
제가 생각하는 라라벨은 백엔드와 관련되어 DB의 데이터를 더 쉽게 컨트롤 할 수 있고 라라벨에서 지원하는 각종 기능과 함수들로 더 빠르게 어플리케이션을 만들 수 있게 도와주는 프레임워크 같습니다.  모던 PHP로 구성되어 있고 지금 당장 PHP의 깊은 지식이 있지 않은 저 같은 사람들도 간단한 어플리케이션을 만들 수 있게 도와줍니다.

>이런 걸 양산형 개발자라고 하는것인가;; 

사실 프론트엔드단의 특정한 라이브러리나 프레임워크를 사용하지 않아도 왠만한 어플리케이션은 라라벨만을 가지고 구현 가능하지 않을까 생각이 듭니다.  기본적으로 라라벨에 프론트엔드 라이브러리인 Vue.js가 내재되어 있는거 보면 '백엔드 라라벨 + 프론트엔드 뷰,리액트 = 멋지고 효율적인 어플리케이션' 라는 공식이 성립되지 않을까라는 생각을 해보았습니다. 

>아직까지 라라벨로든 리액트로든 제대로 된 어플리케이션을 만들어 본 경험이 없으니 알 수가 없지;; 어여 만들어보자꾸나 ㅠㅠ

라라벨과 관련되어 기초적인 내용을 익히다가 프론트엔드 단과 어떻게 조인을 하는지 궁금해졌습니다.  리액트를 어떻게 세팅하고, DB데이터와 리액트가 어떻게 연동되는지 알고 싶어서 관련 정보를 찾고 공부하게 되었습니다.

> 예전 스터디 모임에서 유일하게 접해본 게 React 였기에 라라벨 + 리액트 조합으로 가즈아!!



### Prerequisites

이번 예제를 따라하기 위해서는 밑의 사항과 관련된 지식과 프로그램 세팅이 된 상태여야 합니다.
> 나 역시 php와 javascript 등 지식이 부족한 상태지만 무작정 따라해보는 것을 목표로 삼았습니다. 나 같은 초보자가  천천히 이해하면서 따라할 수 있는 난이도라면 누구라도 할 수 있다라는 희망을 주고 싶다.

- PHP 그리고 Larvel에 대한 기본 지식
- Javascript 그리고 React에 대한 기본 지식
- 컴퓨터에 PHP가 installed 된 상태
- 컴퓨터에 Composer가 installed 된 상태
- 컴퓨터에 Laravel installer가 installed 된 상태
- 컴퓨터에 SQLite가 installed 된 상태 

PHP,Composer,Laravel 기본 세팅은 구글에 너무 좋은 정보들이 있습니다. window환경이든 mac환경이든 참조한 내용으로 직접 install해보면서 예상치 못하게 생기는 Error와 Exception 이슈와 관련되어 다시 구글링으로 문제를 해결해 보는 걸 추천드립니다.

DB와 관련되어 mysql만 사용해봤었는데 이번에 SQLite를 처음으로 알게되었고 사용해 보았습니다. mysql과 sqlite 각각 무엇인고 장단점이 무엇인지 구글링을 통해 확인해 보세요.



### What we'll be building

예제를 만드는 목적은 라라벨에서 리액트가 어떻게 사용되는지를 보여주는 것입니다. 저희는 '할 일 관리' 앱을 만들 예정입니다.

실제 예제는 유저가 'project'를 생성할 수 있고 생성한 'project'에서 내가 해야 할 일, 즉 'task'를 추가 할 수 있는 앱입니다.

1. 'main'페이지에 create new project 라는 버튼이 있고 하단에 각 project들이 리스트로 보여집니다. create 버튼을 누르게 되면 'create project' 페이지로 이동합니다.
2. 'create project' 페이지에서는 project name과 project description을 사용자가 텍스트로 입력할 수 있고 create 버튼을 누르게 되면 다시 메인페이지로 이동을 하게 되고 새로 생성된 project 내용을 리스트로 확인 할 수 있습니다.
3. 'main'페이지에 있는 project 리스트 각 우측에는 해당하는 project의 task가 몇개인지 보여지고 project를 클릭하면 해당 '클릭한 내용의 project' 페이지로 이동하게 됩니다.
4. 'project명'페이지에 들어가면 task 입력란과 add 버튼이 있고 add버튼을 누르게 되면 입력한 task가 하단의 리스트로 보여지게 됩니다. 하단 task리스트 우측에는 'completed' 체크 버튼이 있고 completed버튼을 누르면 해당 task는 리스트에서 제외되게 됩니다.

> 리액트로 매우 간단한 'ToDoList' 예제를 만들어 본 기억을 떠올려 보았다. (백엔드쪽 연동 X) 하도 오래되서 자세히는 기억나지 않지만  add 버튼을 눌렀을때 이벤트가 일어나면 setState와 컴포넌트의 라이프싸이클을 이용해서 할일 리스트를 생성하고 지워줬던거 같다.



### Planning the application
우리가 만들려고 하는 할 일 관리 앱 (여기서는 taskman으로 명칭을 정하겠다.) taskman 앱은 2개의 메인 컴포넌트가 필요합니다.
 - Tasks 컴포넌트 : 각 task 항목에 대해서 사용자가 편하게 할 일을 완료하기 위한 간결한 제목을 입력할 수 있는 기능이 필요하고, 각 해당 할 일에 대해 완료했는지 안했는지 보여져야 합니다.  결국 tasks는 프로젝트와 연관되거나 유사한 할 일들로 이루어져 있습니다.
 - Projects 컴포넌트 :  Projects 그룹은 프로젝트에 대한 설명과 해당하는 모든 tasks를 포함하고 있습니다.. Projects 또한 해당 프로젝트를 완료했는지 안했는지 보여져야 합니다.

	[각 해당하는 DB의 table과 field 속성] - laravel의 migrate를 이용해 생성할 예정
	- tasks : id , title, project_id, is_completed, create_at, updated_at
	- projects : id, name, description, is_completed, create_at, updated_at
	
	



## Creating 'taskman' App



### 1. Getting stated

라라벨의 새로운 프로젝트르롤 생성해보자.
```
$ laravel new taskman
```

라라벨 taskman 프로젝트가 문제없이 install 되었다면, 그 다음으로 할 일은 라라벨에 default로 설정되어 있는 Vue.js의 scaffolding을 React로 변경해야 합니다.(스캐폴딩 명령어는 라라벨 버전에 따라 다르니 라라벨 공식 사이트 문서를 참조하자.)

> 2020년3월 기준으로 최신 라라벨 프로젝트를 설치하게 되면 "laravel/framework" : 7.0 버전으로 install된다. 이번 예제에서는 7.0기준으로 진행해보았다. 
>
> 6.x 기준이라면 밑의 `artisan`명령어 입력전에 `$composer require laravel/ui`명령어로 laravel/ui 를 install해줘야 한다. 
>
> 현재 기준으로 "laravel/ui": 2.0 버전으로 install되는데 "laravel/framework" : 6.x 버전이라면 `$composer require laravel/ui "^1.2"`와 같은 1.x버전으로 install 시켜줘야 한다. 
>
> (현재 laravel/ui 2.0버전은 laravel/framework 7.0 버전에서만 사용이 가능한 거 같다.)

```
$ cd taskman
$ php artisan preset react  //laravel 5.5 기준
$ php artisan ui react      //laravel 6.x or 7.0 기준
```

문제없이 install되었다면 resource > js 디렉토리 내부에 component 디렉토리가 생성되고 `app.js`파일안에 `require('.components/Example');`코드가 추가되어 있습니다.  나중에 Example 컴포넌트에 필요한 코드들이 업데이트 될 예정입니다.

아래 명령어를 실행하여 어플리케이션 dependencies(종속성)을 설치합니다.
```
$ npm install && npm run dev
```



### 2. Creating the app - models and migrations

> 라라벨에서 Model의 개념 (Eloquent ORM) Migrations이 무엇인지 구글링을 통해 간단하게 알아보자.

위의 planning the application 부분을 기준으로 우리는 2개의 Model이 입니다. 바로  **Task** and **Project**. 아래의 코드로 2개의 모델을 만들어 봅시다.
```
$ php artisan make:model Task -m
$ php artisan make:model Project -m
```

model을 생성할때 붙이는 `-m flag` 명령어는 app 디렉토리의 model파일과 더불어 database > migrations 디렉토리에 두개의 migration 파일들을 생성시켜줍니다.

다음은 각 model의 대량할당(Mass Assignment)이 필요한 속성을 $fillable로 정의해 줍니다. 아래의 코드를 추가해 봅시다.

> 기본적인 Eloquent모델의 대량 할당(Mass Assignment)관련된 정보와 Model의 `$fillable`속성에 대한 구글링 자료를 확인해보자.

```php
//app > Task.php
class Task extends Model
{
    protected $fillable = ['title', 'project_id'];
}
```

역시 app/Project.php 파일을 open해서 코드를 추가해 줍시다.

```php
//app > Project.php
class Project extends Model 
{
	protected $fillable = ['name', 'description'];
	
	public function tasks() 
	{
		return $this->hasMany(Task::class);
	}
}
```

`$fillable`을 이용해 대량할당을 위한 필드 속성을 지정해줍니다.
덧붙여서 대량할당을 위한 필드 속성을 지정해주기 위해서는 Project와 Task모델 사이의 관계를 정의해줘야 하는데 그게 바로 `tasks()` 메소드입니다.

> 라라벨 Eloquent ORM의 대량할당(Mass Assign)부분에 대한 정보를 구글링해서 이해하고 넘어가보자. 나도 100% 이해하지는 못했지만 간단히 말하자면 개발자들이 편하게 데이터베이스에 많은 수의 입력을 할당할 수 있게 도와주는 기능을 라라벨에서 제공하고 있는거 같다. [참고자료 바로가기](https://dev.to/zubairmohsin33/understanding-mass-assignment-in-laravel-eloquent-orm-331g)

여기서 관계는 일 대 다 관계(one-to-many relationship)입니다. project는 많은 수의 tasks를 가질 수 있지만 반댈 task는 해당하는 하나의 특정 project에 속해 있어야 합니다.

> [라라벨 코리아 Eloquent:Relationships-관계](https://laravel.kr/docs/6.x/eloquent-relationships) 내용을 참조하자.

반대로 Task 모델에서는 반대되는 역 관계에 대해서는 따로 정의하지 않았습니다. 이번 튜토리얼의 목적에 필요한 것들만 정의하며 진행에 나갈 예정입니다.




다음으로 모델을 생성할때 `-m flag`로 추가된 migrations 파일에 밑의 코드를 추가합니다.
```php
//database > migrations > 2020_03_24_220458_create_tasks_table.php

public function up()
{
	Schema::create('tasks', function (Blueprint $table) {
		$table->increments('id');
		$table->string('title');
		$table->unsignedInesger('project_id');
		$table->boolean('is_completed')-> default(0);
		$table->timestamps();
	});
}
```
> 'is_completed' 필드의 디폴트 값 `default(0)`은 `false`로 이해하면 될 거 같다.



마찬가지로 project migrations 파일에도 밑의 코드를 추가합니다.
```php
//database > migrations > 2020_03_24_220458_create_projets_table.php
public function up()
{
	Schema::create('projects', function (Blueprint $table) {
		$table->increments('id');
		$table->string('title');
		$table->text('description');
		$table->boolean('is_completed')->default(0);
		$table->timestamps();
	});
}
```
migrations 명령어를 실행하기 전 데이터베이스 세팅을 해야 합니다. 여기 예제에서는 **SQLite**를 사용해 진행 할 예정입니다. [sqlite 공식사이트 참조](https://www.sqlite.org/index.html) 'database.sqlite' 파일을 생성하고 진행하는 taskman 디렉토리에 해당 sqlite파일을 옮깁니다. 

문제없이 완료되었다면 다음으로 '.env'파일을 수정해야 합니다.
```
// .env
DB_CONNECTION=sqlite
DB_DATABASE=/Users/macbook/Dropbox/01_Study/BackEnd/laravel/taskman/laravel_react.db -->디렉토리 경로는 각각의 경로에 맞게 적어줍니다.
```

> 나같은 경우 sqlite파일 이름을 'laravel_react.db'란 이름으로 생성했다. 진행하는데 전혀 문제가 없는거 보면 파일 확장자가 '.db' 나 '.sqlite' 이든 상관없는거 같다. 기존에 공부할때는 mysql의 mariaDB를 이용해 DB생성 및 연결을 하고 테스트를 했었는데 SQLite는 처음 사용해 보았다. 간단하게 SQLite를 정의하자면 로컬 베이스의(서버가 필요없음) DB이다. 구글링을 통해 sqlite에 대해 간단히 알아보고 넘어가는 걸 추천한다. 

마지막으로 migrations 시켜줍니다.
```
$ php artisan migrate
```



### 3. Creating the app API

첫 번째로 `routes/api.php` API 엔드포인트를 설정해 줍니다.

> 여기서 가장 헷갈린 부분은 '왜 `web.php`가 아닌 `api.php`에서 Route설정을 해줄까?'' 였다. 기존 다른 포스트의 예제들은 대부분 `web.php`에서 엔드포인트를 설정했었다.(반대로 생각하면 기존 다른 예제들을 따라하면서 왜 `web.php`에 Route설정을 해주는 걸까? 라는 질문을 먼저 던졌어야 하지 않나라는 생각이 든다.) 
>
> 그냥 넘어갈 수는 없어서 관련된 정보를 찾아본 후 최대한 간단하게 정리해 보았다. (100%이해한 부분이 아니기 때문에 자세한 내용은 직접 구글링을 해보자.) 
>
> - `web.php`
> 	- 웹 인터페이스를 위한 Route들을 정의한다.(브라우저를 통해서 유입되는 Route url 정의라고 표현할 수 있을지 모르겠다.) 
> 	- web middleware 그룹이 할당되어 있다. (ex. 세션상태,CSRF보호 등)
> - `api.php` 
> 	- stateless 즉 상태가 없는 형태의 요청들을 Route로 정의한다(??상태가 없는 형태의 요청이 의미를 아직 모르겠다.) 
> 	- api 전용 middleware 그룹이 할당되어 있다. (ex. auth,securuty 등)
> 	- prefix로 모든 Route에 자동으로 'api/' 가 붙게 된다.
> 	
>
> 여기서 **미들웨어(middleware)**란? 애플리케이션으로 들어온 HTTP요청(CRUD)을 간편하게 필터링 할 수 있게 라라벨에서 제공하는 기능이다.

```php
// routes > api.php

Route::get('project', 'ProjectController@index');
Route::post('projects','ProjectController@store');
Route::get('project/{id}', 'ProjectController@show');
Route::put('project/{project}', 'ProjectController@markAsCompleted');

Route::post('tasks', 'TaskController@store');
Route::put('tasks/{task}', 'TaskController@markAsCompleted');
```
여기서 엔드포인트 `get방식`의 'projects' 는 모든 프로젝트들을 가져오고, 'projects/{project}'는 해당하는 단일 프로젝트만을 가져옵니다.

그 다음 `post방식`의 'projects' 엔드포인트와 'tasks' 엔드포인트는 각각 프로젝트와 할 일들을 생성할 수 있습니다.

마지막 `put방식`의 'projects/{project}' 와 'tasks/{task}'는 각각 완료했는지 or 안했는지 대해 체크할 수 있습니다.




다음으로 엔드포인트로 설정해 놓은 2개의 컨트롤러 **ProjectController**와 **TaskController**를 생성시켜 줍니다.
```
$ php artisan make:controller ProjectController
$ php artisan make:controller TaskController
```



생성된 **ProjectController**에 아래의 코드를 추가해 줍니다.

```php
// app > Http > Controllers > ProjectController.php
public function index() 
{
	$projects = Project::where('is_completed', false)
						->orderBy('created_at', 'desc')
						->withCount(['task'=> function ($query) {
							$query->where('is_completed', false);
						}])
						->get();
	return $projects->toJson();
}
```
첫번째로 `index()` 메소드는 모든 프로젝트들을 가져옵니다. (가져오는 조건과 데이터 살펴보기)
 1. 프로젝트가 '완료됨'이라고 표시되지 않은 프로젝트이고(여기서는 `is_completed: false`인 프로젝트) 
 2. '완료됨'이라고 표시되지 않은 조건을 충족시키는 프로젝트들을 생성된 순서로(`create_at`) 내림차순(`desc`)으로 가져옵니다.
 3. 각 프로젝트에는 할 일들(tasks)이 포함되어 있는데, 이 포함된 할 일의 총 갯수가 몇개인지에 대한 정보도 `withCount()`메소드를 통해 가져옵니다. 여기서도 프로젝트 조건과 마찬가지로 '완료됨'이라고 표시되지 않은 할 일들의 총 숫자값을 가져옵니다.
 4. 조건에 충족한 모든 데이터($projects) 값들을 json 형식으로 return 받습니다.

> `withCount()` 메소드는 처음 보았다. 라라벨의 helper함수인거 같긴 한데 일단 여기서는 넘어가고 예제를 전부 따라해보고 자세히 알아봐야 겠다.




```php
// app > Http > Controllers > ProjectController.php
public function store(Request $request)
{
	$validateData = $request->validate([
		'title' => 'required',
		'description' => 'required'
	]);
	$project = Project::create([
		'title' => $validateData['title'],
		'description' => $validateData['description']
	]);
	return response()->json('Project created');
}
```
두번째로 `store(Request $request)` 메소드는 새로운 프로젝트를 생성하게 해줍니다.
 1. 사용자가 입력한 'title'과 'description' 수신 데이터가 각 필드에 정의된 규칙에 맞는지 `validate() 메소드`를 통해 검증됩니다.
 2. 입력한 데이터가 문제가 없다면 데이터베이스에 새로운 프로젝트 데이터를 입력할 수 있습니다.
 3. JSON 형식으로 'project가 생성되었음' 라고 응답값을 return 받습니다.




```php
// app > Http > Controllers > ProjectController.php
public function show($id)
{
	$project = Project::with(['tasks' => function($query) {
		$query->where('is_completed', 'false');
	}])->find($id);
	return $project->toJson();
}
```
세 번째로, `show($id)` 메소드 입니다.
 1. 프로젝트들이 가지고 있는 id필드 값을 이용해 단독 프로젝트를 가져옵니다.
 2. 단독 프로젝트에 포함되어 있는 할 일('tasks')들 중 '완료됨'이라고 표시되지 않은 할 일들만 가져옵니다.
 3. 조건에 충족한 모든 데이터($projects) 값들을 json 형식으로 return 받습니다.




```php
// app > Http > Controllers > ProjectController.php
public function markAsCompleted(Project $project)
{
	$project->is_completed = true;
	$project->update();
	
	return response()->json('project update');
}
```
마지막으로 `markAsCompleted(Project $project)` 메소드는 간단하게 프로젝트의 'is_completed' 값을 'true'로 세팅 후 업데이트 시켜줍니다.






다음으로 **TaskController.php**에 아래의 코드를 추가해 줍시다.
```php
// app > Http > Controllers > TaskController.php
public function store(Request $request) 
{
	$validateData = $request->validate([
		'title' = 'require'
	]);
	$task = Task::create([
		'title' = $validateData['title'],
		'project_id' => $request->project_id
	]);
	return $task->toJson();
}
public function markAsCompleted(Task $task)
{
	$task->is_completed = treu;
	$task->update();
	return response()->json('Task updated');
}
```

TaskController의 `store()`&`markAsCompleted()` 메서드들은 ProjectController 메서드들과 같은 기능을 하므로 추가적인 코멘트는 하지 않고 넘어가겠습니다.
> 예제에서는 이렇게 넘어갔지만 ProjectController와 다른점은 `project_id`유무이다. 위에서도 나왔듯이 one-to-many relationships를 이 `project_id`를 활용해서 각 프로젝트에 대한 할 일 들을 세팅해주는게 아닐까 싶다. 그러니까 각 할 일들 전부 POST방식으로 생성되면서 내가 어디 프로젝트에 속해있는지 `project_id`값을 부여받는 의미로 해석해도 될지 모르겠다. (Project Model에서 `tasks()` 메소드의 `hasMany()`메소드도 연관이 있을거 같다.)  일단 예제를 계속 진행하면서 이 부분에 대해서 나중에 정리해보도록 하자.


이제 'taskman' 어플리케이션의 API 세팅이 완료되었습니다.
> 오 지금까지 했던 것들이 API세팅 이였구나!!



다음으로 FrontEnd 쪽으로 넘어가보도록 하죠.
> 드디어 React가 등장하는구나, 위의 데이터들을 어떻게 활용해서 뿌려지게 만드는지 update는 어떻게 되는지 너무 궁금하다. (두근두근)



### 4. Creating a wildcard route

우리의 어플리케이션의 라우팅을 처리하기 위해 'React Router'를 사용할 것입니다.
그럴러면 모든 어플리케이션 루트에 대해 위한 단일 view 파일을 렌더링 해야 합니다.

```php
//routes > web.php
Route::view('/{path?}', 'app');
```
> 3.creating the app API에서 설정한 모든 루트들의 view단을 리액트로 처리하기 위한 코드가 아닐까 싶다. 여기서 문득 루트 설정을 왜 `web.php`에서 해줬을까 생각해 보았다.`api.php`는 stateless, 즉 형체가 없는 루트들을 정의한다고 나와있었는데 이 말은 즉 데이터들의 루트를 말하는게 아닐까 싶다. 반대로 'web.php'는 형체가 있는 실제로 데이터 보여지는 view와 관련된 루트를 정의하는게 아닐까?? 허허 아직은 잘 모르겠다.

여기서 와일드카드 루트를 정의했습니다.
'app.blade.php' view 파일이 모든 루트들과 관련되어 렌더링하게 되고 이 view파일 안에서 리액트 컴포넌트들이 렌더링 될 것 입니다.

이렇게 된다면 리액트가 제공하는 모든 장점들을 사용할 수 있께 됩니다.


다음으로 'resources/views' 디렉토리에 'app.blade.php' 뷰파일을 생성한 후, 밑의 코드들을 추가해 줍시다.

```html
//resources/view/app.blade.php
<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
	<meta charest="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<!-- CSRF Token -->
	<meta name="csrf-token" content="{{ csrf-toekn }}">
	<title>Taskman</title>
	<!-- Styles -->
	<link href="{{ assets('css/app.css') }}" rel="stylesheet">
</head>
<body>
	<div id="app"></div>
	<script src="{{ asset('js/app.js') }}"></script>
</body>
</html>
```

CSS파일과 Javascript 참조 파일을 추가합니다. (리액트와 다른 의존성 묶음 포함)
id값이 'app'인 빈 div에 리액트 컴포넌트들이 렌더링 될 것 입니다.

또한 메타태그에 CSRF 토큰이 포함되어 있음을 알 수 있습니다.

우리는 Axios를 사용해 보내는 모든 HTTP 요청을 공통 header에 첨부할 것 입니다.
이것에 대한 정의는 'resource/assets/js/bootstrap,js' 파일에 할 예정입니다.

> 여기서 처음 본 코드는 `{{ app()->getLocale() }}` | `{{ csrf_token() }}` | `{{ asset('url') }}`  이렇게 3가지이다. 
>
> 1.getLocale 메서드 : app파사드의 getLocale메서드는 현재 로케일?(언어)나 주어진 로케일?(언어)를 확인할 수 있다고 나와있다. 현재 사용되고 있는 로컬언어를 참조하는 메소드가 아닐까라는 생각을 해본다. [지역화 참조](https://laravel.com/docs/7.x/localization)
>
> 2.csrf_toekn 메소드 : `csrf_token()`메소드 자체는 라라벨의 **helper 함수이다.** 라라벨은 어플리케이션에 의해 관리되는 모든 활성화된 사용자 세션마다 CSRF "토큰"을 자동으로 만들어 줍니다. 이 토큰은 인증된 사용자가 어플리케이션에 request을 할 수 있는 고유한 사용자라는 것을 확인하는데 사용된다고 나와있다. 
>
> HTML을 정의할때, CSRF토큰을 포함시켜서 CSRF보호 미들웨어가 requeset-요청을 검증할 수 있도록 해야한다고 나와있다. 분명 예전에 csrf_token메서드를 추가하지 않거나 `@csrf` 블레이드 지시어를 추가하지 않게되면 '크로스 사이트 공격'과 관련된 error 메세지가 떴었더거 같다. 나중에 테스트를 해보자. [CSRF보호 참조](https://laravel.kr/docs/6.x/csrf) 
>
> 3.asset 메소드 : `asset(url)` 역시 라라벨의 **helper 함수**로서 url변수를 설정하여 asset의 URL 호스트를 설정할 수 있다고 한다.  [helpder함수 참조](https://laravel.kr/docs/6.x/helpers#method-csrf-token)





### 5. Creating the App Component








