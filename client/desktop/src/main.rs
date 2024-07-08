// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{CustomMenuItem, SystemTray, SystemTrayMenu, SystemTrayMenuItem, SystemTrayEvent};
use tauri::Manager;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    let main_menu = SystemTrayMenu::new()
        .add_item(CustomMenuItem::new("toggle_ui".to_string(), "Hide"))
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(CustomMenuItem::new("quit_app".to_string(), "Quit"));

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .system_tray(SystemTray::new().with_menu(main_menu))
        .on_system_tray_event(|app, event| match event {
          SystemTrayEvent::MenuItemClick { id, .. } => {
            let item_handle = app.tray_handle().get_item(&id);
            match id.as_str() {
                "toggle_sync" => {
                    println!("Start sync");
                    item_handle.set_title("Stop Sync").unwrap();
                }
                "toggle_ui" => {
                    let window = app.get_window("main").unwrap();
                    if window.is_visible().unwrap() {
                        window.hide().unwrap();
                        item_handle.set_title("Show").unwrap();
                    } else {
                        window.show().unwrap();
                        window.set_focus().unwrap();
                        item_handle.set_title("Hide").unwrap();
                    }
                }
                "quit_app" => std::process::exit(0),
                _ => {}
            }
          }
          _ => {}
        })
        .build(tauri::generate_context!())
        .expect("error while building tauri application")
        .run(|_app_handle, event| match event {
          tauri::RunEvent::ExitRequested { api, .. } => {
            api.prevent_exit();
          }
          _ => {}
        });
}
