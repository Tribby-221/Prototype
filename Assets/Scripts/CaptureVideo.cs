using System.Diagnostics;
using UnityEngine;
using TMPro;
using RockVR.Video;

    public class CaptureVideo : MonoBehaviour
    {
        private bool isRecording = false;
        private VideoCaptureCtrl VideoCaptureController;
        public TextMeshProUGUI TMPBtn;

    private void Awake()
        {
            VideoCaptureController = this.gameObject.GetComponent<VideoCaptureCtrl>();
            Application.runInBackground = true;
        }
        public void Record(){
            if (isRecording)
            {
                VideoCaptureController.StopCapture();
                TMPBtn.text = "Record";
            }
            else
            {
                VideoCaptureController.StartCapture();
                TMPBtn.text = "Stop";
            }
            isRecording = !isRecording;
    }

        private void Update() {
        if (VideoCaptureController.status == VideoCaptureCtrlBase.StatusType.FINISH)
        {
           //when saved upload to server
        }
    }
}
