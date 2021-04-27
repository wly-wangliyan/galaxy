export let FileUpdate = (file: File, storageUrl: string, upProgress, success, error) => {
  let form = new FormData();
  form.append('file', file);

  let xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.upload.addEventListener('progress', (data) => {
    // 上传进度
    upProgress && upProgress(data);
  });
  xhr.addEventListener('load', (data) => {

  });
  xhr.addEventListener('error', (data) => {
    // 上传失败
  });
  xhr.addEventListener('abort', (data) => {
    // 中断上传
  });
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status == 422) {
        error && error(xhr);
      } else if (xhr.status >= 400 && xhr.status <= 499) {
        error && error(xhr);
      } else if (xhr.status == 500) {
        error && error(xhr);

      } else if (xhr.status == 502) {
        error && error(xhr);
      } else if (xhr.status >= 200 && xhr.status <= 204) {
        let source_url = JSON.parse(xhr.responseText).source_url;
        success && success(source_url);
      }
    }
  };
  xhr.open('POST', storageUrl);
  xhr.send(form);
};
