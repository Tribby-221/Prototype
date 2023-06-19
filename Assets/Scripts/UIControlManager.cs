using System;
using System.Linq;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.InputSystem;
using Unity.RenderStreaming;
using Unity.RenderStreaming.Samples;

using InputSystem = UnityEngine.InputSystem.InputSystem;


    static class InputReceiverExtension
    {
        public static void CalculateInputRegion(this InputReceiver reveiver, Vector2Int size)
        {
            reveiver.CalculateInputRegion(size, new Rect(0, 0, Screen.width, Screen.height));
        }
    }

    static class InputActionExtension
    {
        public static void AddListener(this InputAction action, Action<InputAction.CallbackContext> callback)
        {
            action.started += callback;
            action.performed += callback;
            action.canceled += callback;
        }
    }

    class UIControlManager : MonoBehaviour
    {
        [SerializeField] private SignalingManager renderStreaming;
        [SerializeField] private InputReceiver inputReceiver;
        [SerializeField] private UIController uiController;
        [SerializeField] private VideoStreamSender videoStreamSender;

        private int lastWidth;
        private int lastHeight;
        
        private void Start()
        {
            SyncDisplayVideoSenderParameters();

            if (renderStreaming.runOnAwake)
                return;
            renderStreaming.Run();

            inputReceiver.OnStartedChannel += OnStartedChannel;
            var map = inputReceiver.currentActionMap;
            map["Point"].AddListener(uiController.OnPoint);
            map["Press"].AddListener(uiController.OnPress);
        }

        private void OnStartedChannel(string connectionId)
        {
            CalculateInputRegion();
        }

        // Parameters can be changed from the Unity Editor inspector when in Play Mode,
        // So this method monitors the parameters every frame and updates scene UI.
        private void Update()
        {
#if UNITY_EDITOR
            SyncDisplayVideoSenderParameters();
#endif
            // Call SetInputChange if window size is changed.
            var width = Screen.width;
            var height = Screen.height;
            if (lastWidth == width && lastHeight == height)
                return;
            lastWidth = width;
            lastHeight = height;

            CalculateInputRegion();
        }

        private void CalculateInputRegion()
        {
            if (!inputReceiver.IsConnected)
                return;
            var width = (int)(videoStreamSender.width / videoStreamSender.scaleResolutionDown);
            var height = (int)(videoStreamSender.height / videoStreamSender.scaleResolutionDown);
            inputReceiver.CalculateInputRegion(new Vector2Int(width, height));
            inputReceiver.SetEnableInputPositionCorrection(true);
        }

        private void SyncDisplayVideoSenderParameters()
        {
            if (videoStreamSender == null)
            {
                return;
            }
        }
    }
