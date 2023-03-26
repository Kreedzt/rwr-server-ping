use std::error::Error;
use std::process::{Command, Stdio};

use crate::constants::AVERAGE_KEY;

/// Call system "ping" command
///
/// # Arguments
///
/// * `addr` - A string, eg: "127.0.0.1"
///
/// * `timeout` - timeout by millisecond
///
pub fn ping_addr(addr: &str, timeout: u32) -> String {
    // cmd default output is not "UTF-8"
    let output = Command::new("cmd")
        .args(&["/C", "chcp", "65001", "&&", "ping", "-n", "3", "-w", &timeout.to_string(), addr])
        .output()
        .expect("failed to ping");


    // println!("{}", String::from_utf8_lossy(&output.stdout));

    String::from_utf8_lossy(&output.stdout).to_string()
}

/// Parse ping output string, get ms, -1 is "loss"
///
/// # Arguments
///
/// * `res` - A string that ping_addr returns.
///
pub fn get_ping_res_ms(res: &str) -> i16 {
    let mut ms = -1;

    if let Some(t) = res.lines().last() {
        for packets_res in t.split(",") {
            if packets_res.trim().is_empty() {
                continue;
            }

            // eg1: [Average, 23ms]
            // eg2: [Lost, 3 (100% loss) ]
            let mut loop_key = String::new();
            let mut loop_value = String::new();

            for (index, kv_res) in packets_res.split("=").enumerate() {
                let kv_res = kv_res.trim();
                if kv_res.is_empty() {
                    continue;
                }
                if index == 0 {
                    loop_key = kv_res.to_string();
                } else if index == 1 {
                    loop_value = kv_res.to_string();
                }
            }

            if loop_key == AVERAGE_KEY {
                ms = loop_value.replace("ms", "").parse().unwrap();
            }
        }
    }

    ms
}
