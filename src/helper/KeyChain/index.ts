import * as Keychain from 'react-native-keychain';

const SERVICES = {
  ACCESS: 'myapp_access_token',
  REFRESH: 'myapp_refresh_token',
  TOKEN_ID: 'myapp_token_id',
};

export async function saveTokens({ accessToken, refreshToken, tokenId }: any) {
  try {
    if (accessToken) {
      await Keychain.setGenericPassword('token', accessToken, {
        service: SERVICES.ACCESS,
      });
    }

    if (refreshToken) {
      await Keychain.setGenericPassword('token', refreshToken, {
        service: SERVICES.REFRESH,
      });
    }

    if (tokenId) {
      await Keychain.setGenericPassword('token', tokenId, {
        service: SERVICES.TOKEN_ID,
      });
    }

    return true;
  } catch (error) {
    console.error('Error saving tokens:', error);
    return false;
  }
}

export async function loadTokens() {
  try {
    const access = await Keychain.getGenericPassword({ service: SERVICES.ACCESS });
    const refresh = await Keychain.getGenericPassword({ service: SERVICES.REFRESH });
    const id = await Keychain.getGenericPassword({ service: SERVICES.TOKEN_ID });

    return {
      accessToken: access ? access.password : null,
      refreshToken: refresh ? refresh.password : null,
      tokenId: id ? id.password : null,
    };
  } catch (error) {
    console.error('Error loading tokens:', error);
    return null;
  }
}

export async function deleteTokens() {
  try {
    await Keychain.resetGenericPassword({ service: SERVICES.ACCESS });
    await Keychain.resetGenericPassword({ service: SERVICES.REFRESH });
    await Keychain.resetGenericPassword({ service: SERVICES.TOKEN_ID });

    return true;
  } catch (error) {
    console.error('Error deleting tokens:', error);
    return false;
  }
}
