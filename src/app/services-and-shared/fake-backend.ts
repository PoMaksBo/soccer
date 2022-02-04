import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import {Game, Team} from "../_models/game";
import {User} from "../_models/user.interface";

// Создание в LocalStorage массива игроков
const usersKey = 'tableSoccer-users';
let users = JSON.parse(localStorage.getItem(usersKey) || '[]');
// Создание в LocalStorage массива команд
const teamsKey = 'tableSoccer-teams';
let teams = JSON.parse(localStorage.getItem(teamsKey) || '[]');
// Создание в LocalStorage массива игр
const gamesKey = 'tableSoccer-games';
let games = JSON.parse(localStorage.getItem(gamesKey) || '[]');

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        return handleRoute();

        function handleRoute() {
            switch (true) {
                //    Запросы для пользователей
                case url.endsWith('/auth/login/') && method === 'POST':
                    return authenticate();
                case url.endsWith('/registr/') && method === 'POST':
                    return register();
                case url.endsWith('/players') && method === 'GET':
                    return getUsers();
                case url.match(/\/player\/\d+$/) && method === 'GET':
                    return getUserById();
                case url.match(/\/player\/\d+$/) && method === 'PUT':
                    return updateUser();
                case url.match(/\/player\/\d+$/) && method === 'DELETE':
                    return deleteUser();
                //    Запросы для команд
                case url.endsWith('/teams/create') && method === 'POST':
                  return createTeam();
                case url.endsWith('/teams') && method === 'GET':
                  return getTeams();
                case url.match(/\/teams\/\d+$/) && method === 'DELETE':
                  return deleteTeam();
                case url.match(/\/teams\/\d+$/) && method === 'PUT':
                  return updateTeam();
                 //   Запросы для игр
                case url.endsWith('/createGame') && method === 'POST':
                  return createGame();
                case url.endsWith('/games') && method === 'GET':
                  return getGames();
                case url.match(/\/game\/\d+$/) && method === 'DELETE':
                  return deleteGame();
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
            // if (!(users-stat.find((x: {id: number}) => x.id == 1))) {
            //   user.id = 1
            // } else {
              user.id = users.length ? Math.max(...users.map((x: { id: any; }) => x.id)) + 1 : 1;
              user.player_status = true
              user.player_rating = 0
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
          const teamDetail = team;
          return teamDetail;
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
          if (teams.find((team: { team_name: string; }) => team.team_name === teamForRequest.team_name)) {
            return error('Team name "' + teamForRequest.team_name + '" is already taken')
          }
          teamForRequest.id = teams.length ? Math.max(...teams.map((x: { id: any; }) => x.id)) + 1 : 1;
          teamForRequest.team_status = 1
          teamForRequest.team_rating = 0
          teams.push(teamForRequest);
          localStorage.setItem(teamsKey, JSON.stringify(teams));
          return teamResponse();
        }

        function getTeams() {
          if (!isLoggedIn()) return unauthorized();
          return teamResponse(teams.map((team: Team) => basicDetailsTeam(team)));
        }

        function deleteTeam() {
          teams = teams.filter((team: { id: number; }) => team.id !== idFromUrl());
          localStorage.setItem(teamsKey, JSON.stringify(teams));
          return teamResponse();
        }

        function updateTeam() {
          let params = body;
          let team = teams.find((x: { id: number; }) => x.id === idFromUrl());
          // update and save team
          Object.assign(team, params);
          localStorage.setItem(teamsKey, JSON.stringify(teams));
          return teamResponse();
        }

      //  Методы для создания игр
        function createGame() {
          const gameForRequest = body
          updateWin(body)
          gameForRequest.id = games.length ? Math.max(...games.map((x: { id: any; }) => x.id)) + 1 : 1;
          games.push(gameForRequest);
          localStorage.setItem(gamesKey, JSON.stringify(games));
          return gameResponse();
        }

        function gameResponse(body?: Game | undefined) {
          return of(new HttpResponse({ status: 200, body }))
            .pipe(delay(500)); // delay observable to simulate server api call
        }

        function getGames() {
          if (!isLoggedIn()) return unauthorized();
          return gameResponse(games.map((game: Game) => basicDetailsGame(game)));
        }

        function basicDetailsGame(game: Game) {
          const gameDetail = game;
          return gameDetail;
        }

        function deleteGame() {
          games = games.filter((game: { id: number; }) => game.id !== idFromUrl());
          localStorage.setItem(gamesKey, JSON.stringify(games));
          return gameResponse();
        }

        //Метод для обновления значений вин у команд и игроков
        function updateWin(gameForRequest: Game) {
          if (gameForRequest.team_winner){
            let team = teams.find((team: { id: number; }) => team.id === gameForRequest.team_winner?.id);
            let newTeamWin = team.team_rating! + 1;
            let teamParams = {team_rating: newTeamWin}
            Object.assign(team, teamParams);
            localStorage.setItem(teamsKey, JSON.stringify(teams));
          }
          if (gameForRequest.player_winner){
            let player = users.find((user: { id: number; }) => user.id === gameForRequest.player_winner?.id);
            let newPlayerWin = player.player_rating +1
            let playerParams = {player_rating: newPlayerWin}
            Object.assign(player, playerParams);
            localStorage.setItem(usersKey, JSON.stringify(users));
          }
        }
    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
