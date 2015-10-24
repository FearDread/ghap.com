var $, config;

$ = require('najax');
config = require('../config');
console.log('ajax? ', $.ajax);

module.exports = {
    endpoints:{
        ranks:'https://api.sportsdatallc.org/nba-t3/seasontd/2014/reg/rankings.xml?api_key=' + config.sdata.key,
        season:'https://api.sportsdatallc.org/nba-t3/seasontd/2014/reg/teams/[team_id]/statistics.xml?api_key=395ykxy34yqan3txm5zaqv6u',
        injuries:'https://api.sportsdatallc.org/nba-t3/league/injuries.xml?api_key=395ykxy34yqan3txm5zaqv6u',
        schedule:'https://api.sportsdatallc.org/nba-t3/games/2014/reg/schedule.xml?api_key=395ykxy34yqan3txm5zaqv6u',
        standings:'https://api.sportsdatallc.org/nba-t3/seasontd/2014/reg/standings.xml?api_key=395ykxy34yqan3txm5zaqv6u',
        game:'http://api.sportsdatallc.org/nba-[access_level][version]/games/[game_id]/summary.xml?api_key=[your_api_key]',
        series:'http(s)://api.sportsdatallc.org/nba-[access_level][version]/series/[season]/[nba_season]/schedule.xml?api_key=[your_api_key]'
    },
    set_cookie: function (name, time) {
        $.cookie(name, 1,{
            expires:time,
        });
    },
    check_cookie: function (name) {
        var val = $.cookie(name);

        if (val) {
            return true;
        } else {
            return false;
        }
    },
    getInjuries: function () {
        return $({url:this.endpoints.injuries}); 
    },
    getSeason: function () {
        return $({url:this.endpoints.season});
    },
    getSchedule: function () {
        return $({url:this.endpoints.schedule}); 
    },
    getSeries: function () {
        return $({url:this.endpoints.series});
    },
    getStandings: function () {
        return $({url:this.endpoints.standings}); 
    },
    getRankings: function () {
        return $({url:this.endpoints.ranks});
    }
};
