#![windows_subsystem = "windows"]

use std::thread;
use std::sync::{Mutex, Arc};

mod utils;
mod constants;

use utils::{get_ping_res_ms, ping_addr};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
async fn ping_server(ip: &str) -> Result<i16, String> {
    let res = ping_addr(ip, 1000);
    let ms = get_ping_res_ms(&res);

    Ok(ms)
}

#[tauri::command]
async fn ping_server_list(ip_vec: Vec<&str>) -> Result<Vec<i16>, String> {
    let vec_len = ip_vec.len();
    let mut res_vec: Vec<i16> = vec![-1; vec_len];
    let result = Arc::new(Mutex::new(res_vec));

    let mut handles = Vec::with_capacity(ip_vec.len());

    let ip_vec_iter = ip_vec.iter().map(|s| s.to_string()).enumerate();

    for (index, ip) in ip_vec_iter {
        let result = Arc::clone(&result);

        let handle = thread::spawn(move || {
            let saved_index = index;
            let ms = get_ping_res_ms(&ping_addr(&ip, 1000));

            let mut result_vec = result.lock().unwrap();

            result_vec[saved_index] = ms;
        });

        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }

    let mut new_result = Vec::with_capacity(vec_len);
    new_result.append(&mut *result.lock().unwrap());

    Ok(new_result)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![ping_server, ping_server_list])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
