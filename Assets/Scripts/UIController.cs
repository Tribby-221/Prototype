using UnityEngine.UI;
using UnityEngine;
using UnityEngine.InputSystem;
using Unity.RenderStreaming;

[RequireComponent(typeof(RectTransform))]
public class UIController : MonoBehaviour
{
    [SerializeField] Image pointer;
    private RectTransform m_rectTransform = null;

    // Start is called before the first frame update
    void Start()
    {
        m_rectTransform = GetComponent<RectTransform>();

    }
    public void SetDevice(InputDevice device, bool add = false)
    {
    }

    public void OnPoint(InputAction.CallbackContext context)
    {
        if (m_rectTransform == null)
            return;
        var position = context.ReadValue<Vector2>();
        var screenSize = new Vector2Int(Screen.width, Screen.height);
        position = position / screenSize * new Vector2(m_rectTransform.rect.width, m_rectTransform.rect.height);
        pointer.rectTransform.anchoredPosition = position;
    }
    public void OnPress(InputAction.CallbackContext context)
    {
        var button = context.ReadValueAsButton();
        pointer.color = button ? Color.red : Color.clear;
    }
}
