export const checkIfMobile = () => {
  const pcDevice = 'win16|win32|win64|mac|macintel';
  const thisDevice = navigator.platform;

  if (thisDevice) {
    return pcDevice.indexOf(thisDevice.toLowerCase()) < 0;
  } else {
    return false;
  }
};
