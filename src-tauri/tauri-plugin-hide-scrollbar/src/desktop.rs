use serde::de::DeserializeOwned;
use tauri::{plugin::PluginApi, AppHandle, Runtime};

use crate::models::*;

pub fn init<R: Runtime, C: DeserializeOwned>(
  app: &AppHandle<R>,
  _api: PluginApi<R, C>,
) -> crate::Result<HideScrollbar<R>> {
  Ok(HideScrollbar(app.clone()))
}

/// Access to the hide-scrollbar APIs.
pub struct HideScrollbar<R: Runtime>(AppHandle<R>);

impl<R: Runtime> HideScrollbar<R> {
  pub fn ping(&self, payload: PingRequest) -> crate::Result<PingResponse> {
    Ok(PingResponse {
      value: payload.value,
    })
  }
}
