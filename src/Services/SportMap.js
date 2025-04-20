export function getKeyMap() {
    return {
        fotbal: {
            home: {
                "Počet gólů": "count_of_goals_home_team",
                "Držení míče": "holding_the_ball_home_team",
                "Střely na bránu": "number_of_shots_on_goal_home_team",
                "Celkové střely": "number_of_shots_home_team",
                "Rohy": "number_of_corner_home_team",
                "Ofsajdy": "number_of_offside_home_team",
                "Fauly": "number_of_fouls_home_team",
                "Červené karty": "number_of_red_cards_home_team",
                "Žluté karty": "number_of_yellow_cards_home_team"
            },
            away: {
                "Počet gólů": "count_of_goals_away_team",
                "Držení míče": "holding_the_ball_away_team",
                "Střely na bránu": "number_of_shots_on_goal_away_team",
                "Celkové střely": "number_of_shots_away_team",
                "Rohy": "number_of_corner_away_team",
                "Ofsajdy": "number_of_offside_away_team",
                "Fauly": "number_of_fouls_away_team",
                "Červené karty": "number_of_red_cards_away_team",
                "Žluté karty": "number_of_yellow_cards_away_team"
            }
        },
        hokej: {
            home: {
                "Počet gólů": "hockey_count_of_goals_home_team",
                "Úspěšnost střelby": "hockey_shooting_succes_home_team",
                "Počet střel na bránu": "hockey_number_of_shots_on_goal_home_team",
                "Počet střel celkem": "hockey_number_of_goal_home_team",
                "Počet vyloučení": "hockey_number_of_exlusion_home_team",
            },
            away: {
                "Počet gólů": "hockey_count_of_goals_away_team",
                "Úspěšnost střelby": "hockey_shooting_succes_away_team",
                "Počet střel na bránu": "hockey_number_of_shots_on_goal_away_team",
                "Počet střel celkem": "hockey_number_of_goal_away_team",
                "Počet vyloučení": "hockey_number_of_exlusion_away_team",
            }
        },
        basketbal: {
            home: {
                "Počet bodů": "basketball_points_home_team",
                "Úspěšnost střelby": "basketball_shooting_success_home_team",
                "Počet asistencí": "basketball_assists_home_team",
                "Počet doskoků": "basketball_rebounds_home_team",
                "Počet ztrát": "basketball_turnovers_home_team",
                "Počet faulů": "basketball_fouls_home_team"
            },
            away: {
                "Počet bodů": "basketball_points_away_team",
                "Úspěšnost střelby": "basketball_shooting_success_away_team",
                "Počet asistencí": "basketball_assists_away_team",
                "Počet doskoků": "basketball_rebounds_away_team",
                "Počet ztrát": "basketball_turnovers_away_team",
                "Počet faulů": "basketball_fouls_away_team"
            }
        },
        americky_fotbal: {
            home: {
                "Počet bodů": "american_football_points_home_team",
                "Počet prvních downů": "american_football_first_downs_home_team",
                "Počet yardů": "american_football_yards_home_team",
                "Počet touchdownů": "american_football_touchdowns_home_team",
                "Počet interceptions": "american_football_interceptions_home_team",
                "Počet fumbles": "american_football_fumbles_home_team",
                "Počet trestných yardů": "american_football_penalty_yards_home_team"
            },
            away: {
                "Počet bodů": "american_football_points_away_team",
                "Počet prvních downů": "american_football_first_downs_away_team",
                "Počet yardů": "american_football_yards_away_team",
                "Počet touchdownů": "american_football_touchdowns_away_team",
                "Počet interceptions": "american_football_interceptions_away_team",
                "Počet fumbles": "american_football_fumbles_away_team",
                "Počet trestných yardů": "american_football_penalty_yards_away_team"
            }
        },
        sipky: {
            home: {
                "Počet vyhraných setů": "count_of_sets_first_player",
                "Počet vyhraných legů": "count_of_legs_first_player",
                "Průměr": "average_first_player",
            },
            away: {
                "Počet vyhraných setů": "count_of_sets_second_player",
                "Počet vyhraných legů": "count_of_legs_second_player",
                "Průměr": "average_second_player",
            }
        }
    };
}
