use dotenv::dotenv;
use std::env;

// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#[cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
fn main() {
    // GET ENV EXAMPLE
    dotenv().ok(); // Reads the .env file

    let api_key = env::var("GAMES_DB_API_KEY");

    match api_key {
        Ok(val) => println!("API_KEY: {:?}", val),
        Err(e) => println!("Error API_KEY: {}", e),
    }
    scrap_lib::run();
}
