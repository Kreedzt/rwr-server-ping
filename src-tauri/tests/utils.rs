use rwr_server_ping::utils::{ping_addr, get_ping_res_ms};

#[test]
fn test_ping_local() {
    let ms = get_ping_res_ms(&ping_addr("127.0.0.1", 3000));

    assert_ne!(ms, -1);
}

#[test]
fn test_ping_remote() {
    let ms = get_ping_res_ms(&ping_addr("223.5.5.5", 3000));

    assert_ne!(ms, -1);
}

#[test]
fn test_ping_remote_loss() {
    let ms = get_ping_res_ms(&ping_addr("1.1.0.0", 3000));

    assert_eq!(ms, -1)
}
