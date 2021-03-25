# Scalable Angular Project

A highly scalable Angular project structure built for short-term clarity of implmenation with the goal of structural longevity dervied from the [Angular Style Guide](https://angular.io/guide/styleguide).

> *"Structure the app such that you can locate code quickly"* 

> *"Have a near-term view of implementation and a long-term vision"*

```
|-- app
    |-- modules
        |-- main
            |-- [+] components
            |-- [+] pages
            |-- main-routing.module.ts
            |-- main.component.ts|html|scss|spec
            |-- main.module.ts
    |-- core
        |-- [+] authentication
        |-- [+] guards
        |-- [+] http
        |-- [+] interceptors
        |-- [+] services
        |-- core.module.ts
    |-- shared
        |-- [+] components
        |-- [+] directives
        |-- [+] pipes
        |-- [+] models
|-- assets
    |-- scss
        |-- [+] core
        |-- core.scss
```

## Modules

Each module should contain a base component *(similar to app.module)* to be used as the layout/entry-point into the module. Additional pages and components are also declared within each module if neccessary. 

```
|-- modules
    |-- main
        |-- components
            |-- [+] footer
            |-- [+] sidebar
            |-- [+] toolbar
            |-- ...
        |-- pages
            |-- main-page
                |-- main-page.component.ts|html|scss|spec
        |-- main.component.ts|html|scss|spec
        |-- main-routing.module.ts
        |-- main.module.ts
```

This structure allows for modular routing whereby each module defines its own routing logic:

```Typescript
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// The layout/entry-point to the module
import { MainComponent } from './main.component'; 

// Page-component imports...

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      // Child page-components
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
```

## Core Module

The `CoreModule` takes on the role of the root `AppModule` however it is not the module which gets bootstrapped by Angular at run-time. The `CoreModule` should only contain singleton services, universal components, and other features that require only a single instance per application. This is enforced further by an import guard (`ensureModuleLoadedOnceGuard.ts`).

```
|-- core
    |-- [+] authentication
    |-- [+] guards
    |-- [+] http
    |-- [+] interceptors
    |-- [+] services
    |-- core.module.ts
    |-- ensureModuleLoadedOnceGuard.ts
```

## Shared Module

The `SharedModule` contains any shared components, services, etc. The `SharedModule` can be imported in any other module when those items will be re-used. When contriburting to the module, each contributed item **should not** have any dependency to the rest of the application.

```
|-- shared
    |-- [+] components
    |-- [+] directives
    |-- [+] models
    |-- [+] pipes
```

## Styling

The global styles for the project are placed in a `scss` folder under `assets`.

```
|-- scss
    |-- [+] core
        |-- [+] mixins
        |-- [+] variables
        |-- ...
    |-- core.scss
```

All scss partials are placed within the `core` folder, with additional structure to support custom material theming, global varibles, and mixins.

## Resources

- [Angular Style Guide](https://angular.io/guide/styleguide)
- [Mathis Garberg](https://itnext.io/choosing-a-highly-scalable-folder-structure-in-angular-d987de65ec7)
- [Tom Cowley](https://medium.com/@motcowley/angular-folder-structure-d1809be95542)