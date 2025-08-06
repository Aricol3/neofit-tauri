use tauri::{
  plugin::{Builder, TauriPlugin},
  Manager, Runtime,
};

pub use models::*;

#[cfg(desktop)]
mod desktop;
#[cfg(mobile)]
mod mobile;

mod commands;
mod error;
mod models;

pub use error::{Error, Result};

#[cfg(desktop)]
use desktop::HideScrollbar;
#[cfg(mobile)]
use mobile::HideScrollbar;

/// Extensions to [`tauri::App`], [`tauri::AppHandle`] and [`tauri::Window`] to access the hide-scrollbar APIs.
pub trait HideScrollbarExt<R: Runtime> {
  fn hide_scrollbar(&self) -> &HideScrollbar<R>;
}

impl<R: Runtime, T: Manager<R>> crate::HideScrollbarExt<R> for T {
  fn hide_scrollbar(&self) -> &HideScrollbar<R> {
    self.state::<HideScrollbar<R>>().inner()
  }
}

/// Initializes the plugin.
pub fn init<R: Runtime>() -> TauriPlugin<R> {
  Builder::new("hide-scrollbar")
    .invoke_handler(tauri::generate_handler![commands::ping])
    .setup(|app, api| {
      #[cfg(mobile)]
      let hide_scrollbar = mobile::init(app, api)?;
      #[cfg(desktop)]
      let hide_scrollbar = desktop::init(app, api)?;
      app.manage(hide_scrollbar);
      Ok(())
    })
    .build()
}
