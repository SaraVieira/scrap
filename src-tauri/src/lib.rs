use serde::{Deserialize, Serialize};
use std::fs::{self, metadata};
use std::path::{Path, PathBuf};


fn _list_files(vec: &mut Vec<PathBuf>, path: &Path) {
    if metadata(&path).unwrap().is_dir() {
        let paths = fs::read_dir(&path).unwrap();
        for path_result in paths {
            let full_path = path_result.unwrap().path();
            if metadata(&full_path).unwrap().is_dir() {
                _list_files(vec, &full_path);
            } else {
                vec.push(full_path);
            }
        }
    }
}

#[derive(Serialize, Deserialize, Debug)]
struct Folders {
    name: String,
    path: PathBuf,
}

#[tauri::command]
fn list_folders(path: &str) -> Vec<Folders> {
    let mut vec = Vec::new();

    if metadata(Path::new(path)).unwrap().is_dir() {
        let paths = fs::read_dir(&path).unwrap();
        for path_result in paths {
            let full_path = path_result.unwrap().path();
            if metadata(&full_path).unwrap().is_dir() {
                let name = full_path.file_name().unwrap().to_str().unwrap().to_string();
                vec.push(Folders {
                    name,
                    path: full_path.clone(),
                });
            }
        }
    }
    vec
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![list_folders])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
