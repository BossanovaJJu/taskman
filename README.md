### 참조 내용
[Using React in a Laravel application](https://blog.pusher.com/react-laravel-application) 원문 컨텐츠를 읽어보고 예제를 따라해보면서 관련 내용과 제 생각과 피드백을 적어보았습니다.  많이 부족하지만 재미있게 봐주세요!

> 이런식의 글들은 제 자신에게 이야기하는 글들이니 이해해주세요.






## 시작하기에 앞서..
제가 생각하는 라라벨은 백엔드와 관련되어 DB의 데이터를 더 쉽게 컨트롤 할 수 있고 라라벨에서 지원하는 각종 기능과 함수들로 더 빠르게 어플리케이션을 만들 수 있게 도와주는 프레임워크 같습니다.  모던 PHP로 구성되어 있고 지금 당장 PHP의 깊은 지식이 있지 않은 저 같은 사람들도 간단한 어플리케이션을 만들 수 있게 도와줍니다.

>이런 걸 양산형 개발자라고 하는것인가;;

사실 프론트엔드단의 특정한 라이브러리나 프레임워크를 사용하지 않아도 왠만한 어플리케이션은 라라벨만을 가지고 구현 가능하지 않을까 생각이 듭니다.  기본적으로 라라벨에 프론트엔드 라이브러리인 Vue.js가 내재되어 있는거 보면 '백엔드 라라벨 + 프론트엔드 뷰,리액트 = 멋지고 효율적인 어플리케이션' 라는 공식이 성립되지 않을까라는 생각을 해보았습니다. 

>아직까지 라라벨로든 리액트로든 제대로 된 어플리케이션을 만들어 본 경험이 없으니 알 수가 없지;; 어여 만들어보자꾸나 ㅠㅠ

라라벨과 관련되어 기초적인 내용을 익히다가 프론트엔드 단과 어떻게 조인을 하는지 궁금해졌습니다.  리액트를 어떻게 세팅하고, DB데이터와 리액트가 어떻게 연동되는지 알고 싶어서 관련 정보를 찾고 공부하게 되었습니다.

> 예전 스터디 모임에서 유일하게 접해본 게 React 였기에 라라벨 + 리액트 조합으로 가즈아!!



## Prerequisites

이번 예제를 따라하기 위해서는 밑의 사항과 관련된 지식&세팅이 된 상태여야 합니다.
> 저 역시 php와 javascript 등 지식이 부족한 상태지만 무작정 따라해보는 것을 목표로 삼았습니다.

- PHP 그리고 Larvel에 대한 기본 지식
- Javascript 그리고 React에 대한 기본 지식
- 컴퓨터에 PHP가 installed 된 상태
- 컴퓨터에 Composer가 installed 된 상태
- 컴퓨터에 Laravel installer가 installed 된 상태
- 컴퓨터에 SQLite가 installed 된 상태 

PHP,Composer,Laravel 기본 세팅은 구글에 너무 좋은 정보들이 있습니다. window환경이든 mac환경이든 참조한 내용으로 직접 install해보면서 예상치 못하게 생기는 Error와 Exception 이슈와 관련되어 다시 구글링으로 문제를 해결해 보는 걸 추천드립니다.

DB와 관련되어 mysql만 사용해봤었는데 이번에 SQLite를 처음으로 알게되었고 사용해 보았습니다. mysql과 sqlite 각각 무엇인고 장단점이 무엇인지 구글링을 통해 확인해 보세요.



## What we'll be building

예제를 만드는 목적은 라라벨에서 리액트가 어떻게 사용되는지를 보여주는 것입니다. 저희는 '할 일 관리' 앱을 만들 예정입니다.

실제 예제는 유저가 'project'를 생성할 수 있고 생성한 'project'에서 내가 해야 할 일, 즉 'task'를 추가 할 수 있는 앱입니다.

1. 'main'페이지에 create new project 라는 버튼이 있고 하단에 각 project들이 리스트로 보여집니다. create 버튼을 누르게 되면 'create project' 페이지로 이동합니다.
2. 'create project' 페이지에서는 project name과 project description을 사용자가 텍스트로 입력할 수 있고 create 버튼을 누르게 되면 다시 메인페이지로 이동을 하게 되고 새로 생성된 project 내용을 리스트로 확인 할 수 있습니다.
3. 'main'페이지에 있는 project 리스트 각 우측에는 해당하는 project의 task가 몇개인지 보여지고 project를 클릭하면 해당 '클릭한 내용의 project' 페이지로 이동하게 됩니다.
4. 'project명'페이지에 들어가면 task 입력란과 add 버튼이 있고 add버튼을 누르게 되면 입력한 task가 하단의 리스트로 보여지게 됩니다. 하단 task리스트 우측에는 'completed' 체크 버튼이 있고 completed버튼을 누르면 해당 task는 리스트에서 제외되게 됩니다.

> 리액트로 매우 간단한 'ToDoList' 예제를 만들어 본 기억을 떠올려 보았다. (백엔드쪽 연동 X) 하도 오래되서 자세히는 기억나지 않지만  add 버튼을 눌렀을때 이벤트가 일어나면 setState와 컴포넌트의 라이프싸이클을 이용해서 할일 리스트를 생성하고 지워줬던거 같다.



## Planning the application
우리가 만들려고 하는 할 일 관리 앱 (여기서는 taskman으로 명칭을 정하겠다.) taskman 앱은 2개의 메인 컴포넌트가 필요합니다.
 - Tasks 컴포넌트 : 각 task 항목에 대해서 사용자가 편하게 할 일을 완료하기 위한 간결한 제목을 입력할 수 있는 기능이 필요하고, 각 해당 할 일에 대해 완료했는지 안했는지 보여져야 합니다.  결국 tasks는 프로젝트와 연관되거나 유사한 할 일들로 이루어져 있습니다.
 - Projects 컴포넌트 :  Projects 그룹은 프로젝트에 대한 설명과 해당하는 모든 tasks를 포함하고 있습니다.. Projects 또한 해당 프로젝트를 완료했는지 안했는지 보여져야 합니다.

	[각 해당하는 Tables과 fields] - laravel의 migrate를 이용해 생성할 예정
	- tasks : id , title, project_id, is_completed, create_at, updated_at
	- projects : id, name, description, is_completed, create_at, updated_at
	
	


## Getting stated

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


### Creating the app - models an migrations
> 라라벨에서 Model의 개념 (Eloquent ORM) Migrations이 무엇인지 구글링을 통해 간단하게 알아보자.

위의 planning the application 부분을 기준으로 우리는 2개의 Model이 필요하다. **Task** and **Project**
```
$ php artisan make:model Task -m
$ php artisan make:model Project -m
```

model을 생성할때 붙이는 `-m flag` 명령어는 app 디렉토리의 model파일과 더불어 database > migrations 디렉토리에 두개의 migration 파일들을 생성시켜준다.

다음은 각 model들에 대량할당(Mass Assignment)할 모델의 속성을 $fillable로 정의해 주자. 아래의 코드를 추가하자. 

> 기본적인 Eloquent모델의 대량 할당(Mass Assignment)관련된 정보와 Model의 `$fillable`속성에 대한 구글링 자료를 확인해보자.

```php
[app > Task.php]
class Task extends Model
{
    protected $fillable = ['title', 'project_id'];
}
```

역시 app/Project.php 파일을 open해서 코드를 추가해주자.

```php
[app > Project.php]
class Project extends Model 
{
	protected $fillable = ['name', 'description'];
	
	public function tasks() 
	{
		return $this->hasMany(Task::class);
	}
}
```
