use std::error::Error;
use std::process::{Command, Stdio};
use std::os::windows::process::CommandExt;

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
        .creation_flags(0x08000000)
        .output()
        .expect("failed to ping");

    // Macos:
    // ping x.x.x.x -t 3 -c 3
    //
    // 64 bytes from x.x.x.x: icmp_seq=0 ttl=44 time=273.597 ms
    //
    // --- x.x.x.x ping statistics ---
    // 2 packets transmitted, 1 packets received, 50.0% packet loss
    // round-trip min/avg/max/stddev = 273.597/273.597/273.597/0.000 ms

    // 64 bytes from x.x.x.x: icmp_seq=0 ttl=44 time=273.597 ms
    //
    // --- x.x.x.x ping statistics ---
    // 2 packets transmitted, 1 packets received, 50.0% packet loss
    // round-trip min/avg/max/stddev = 273.597/273.597/273.597/0.000 ms

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
