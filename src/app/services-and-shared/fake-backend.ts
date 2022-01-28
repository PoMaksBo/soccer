import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import {Team} from "../_models/game";
import {User} from "../_models/user.interface";

// array in local storage for registered users
const usersKey = 'tableSoccer-example-users';
const teamsKey = 'tableSoccer-example-teams';
let users = JSON.parse(localStorage.getItem(usersKey) || '[]');
let teams = JSON.parse(localStorage.getItem(teamsKey) || '[]');

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        return handleRoute();

        function handleRoute() {
            switch (true) {
                //    Запросы для пользователей
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/users/register') && method === 'POST':
                    return register();
                case url.endsWith('/users') && method === 'GET':
                    return getUsers();
                case url.match(/\/users\/\d+$/) && method === 'GET':
                    return getUserById();
                case url.match(/\/users\/\d+$/) && method === 'PUT':
                    return updateUser();
                case url.match(/\/users\/\d+$/) && method === 'DELETE':
                    return deleteUser();
                //    Запросы для команд
                case url.endsWith('/teams/create') && method === 'POST':
                  return createTeam();
                case url.endsWith('/teams') && method === 'GET':
                  return getTeams();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }
        }

        // route functions
        function authenticate() {
            const { username, password } = body;
            const user = users.find((x: { username: string; password: string; }) => x.username === username && x.password === password);
            if (!user) return error('Username or password is incorrect');
            return userResponse({
                ...basicDetailsUser(user),
                token: 'fake-jwt-token'
            })
        }

        function register() {
            const user = body
            if (users.find((x: { username: string; password: string; }) => x.username === user.username)) {
                return error('Username "' + user.username + '" is already taken')
            }
            // if (!(users.find((x: {id: number}) => x.id == 1))) {
            //   user.id = 1
            // } else {
              user.id = users.length ? Math.max(...users.map((x: { id: any; }) => x.id)) + 1 : 1;
            // }
            users.push(user);
            localStorage.setItem(usersKey, JSON.stringify(users));
            return userResponse();
        }

        function getUsers() {
            if (!isLoggedIn()) return unauthorized();
            return userResponse(users.map((x: any) => basicDetailsUser(x)));
        }

        function getUserById() {
            if (!isLoggedIn()) return unauthorized();
            const user = users.find((x: { id: any; }) => x.id === idFromUrl());
            return userResponse(basicDetailsUser(user));
        }

        function updateUser() {
          if (!isLoggedIn()) return unauthorized();
          let params = body;
          let user = users.find((x: { id: number; }) => x.id === idFromUrl());
          // only update password if entered
          if (!params.password) {
            delete params.password;
          }
          // update and save user
          Object.assign(user, params);
          localStorage.setItem(usersKey, JSON.stringify(users));
          return userResponse();
        }

        function deleteUser() {
            if (!isLoggedIn()) return unauthorized();

            users = users.filter((x: { id: any; }) => x.id !== idFromUrl());
            localStorage.setItem(usersKey, JSON.stringify(users));
            return userResponse();
        }

        // helper functions

        function userResponse(body?: User | undefined) {
            return of(new HttpResponse({ status: 200, body }))
                .pipe(delay(500)); // delay observable to simulate server api call
        }

      function teamResponse(body?: Team | undefined) {
        return of(new HttpResponse({ status: 200, body }))
          .pipe(delay(500)); // delay observable to simulate server api call
      }

      function error(message: string) {
        return throwError({ error: { message } })
          .pipe(delay(500)); // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648);
      }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorized' } })
                .pipe(materialize(), delay(500), dematerialize());
        }

        function basicDetailsUser(user: User) {
            const userDetail = user;
            return userDetail;
        }

      function basicDetailsTeam(team: Team) {
        const { id, teamName, player1, player2 } = team;
        return { id, teamName, player1, player2 };
      }

        function isLoggedIn() {
            return headers.get('Authorization') === 'Bearer fake-jwt-token';
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }

    //    Methods for teams
      function createTeam() {
        const teamForRequest = body
        if (teams.find((team: { teamName: string; }) => team.teamName === teamForRequest.teamName)) {
          return error('Team name "' + teamForRequest.teamName + '" is already taken')
        }
        // if (!(users.find((x: {id: number}) => x.id == 1))) {
        //   user.id = 1
        // } else {
        teamForRequest.id = teams.length ? Math.max(...teams.map((x: { id: any; }) => x.id)) + 1 : 1;
        // }
        teams.push(teamForRequest);
        localStorage.setItem(teamsKey, JSON.stringify(teams));
        return teamResponse();
      }

      function getTeams() {
        if (!isLoggedIn()) return unauthorized();
        return teamResponse(teams.map((team: Team) => basicDetailsTeam(team)));
      }

    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
