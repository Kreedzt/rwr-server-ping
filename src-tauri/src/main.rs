// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod utils;
mod constants;

use utils::{get_ping_res_ms, ping_addr};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn ping_server(ip: &str) -> Result<i16, String> {
    let res = ping_addr(ip, 1000);
    let ms = get_ping_res_ms(&res);

    Ok(ms)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![ping_server])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
