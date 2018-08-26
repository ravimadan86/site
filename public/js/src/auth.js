$(function () {
    populateWalletModal();

    $('#logOutButton').on('click', function () {
        logOut();
    });

    $('#logInButton').on('click', function () {
        var walletId = $('#walletId').val();
        var walletKey = $('#walletKey').val();
        if (walletId && walletKey) {
            logIn(walletId, walletKey);
        } else {
            alert('Both Wallet ID and Key values are required');
        }
    });
});

function generateNewWallet(callback) {
    $.ajax({
        url: '/auth/generate',
        success: function (res) {
            if (callback) {
                callback(res);
            }
        }, 
        error: function (res) {
            console.log('Error generating a new wallet.')
        }
    });
}

function populateWalletModal() {
    if (isRegistered()) {
        var walletId = Cookies.get('MedPoints_PrivateKey');
        var walletKey = Cookies.get('MedPoints_PublicKey');
        setInfoWalletIdValue(walletId);
        setInfoWalletKeyValue(walletKey);
    }
}

function setInfoWalletIdValue(Id) {
    $('#infoWalletId').val(Id);
    $('#infoWalletIdText').html(Id);
}

function setInfoWalletKeyValue(Key) {
    $('#infoWalletKey').val(Key);
    $('#infoWalletKeyText').html(Key);
}

function isRegistered() {
    return Cookies.get('MedPoints_PrivateKey') && Cookies.get('MedPoints_PublicKey');
}

function logOut() {
    Cookies.remove('MedPoints_PrivateKey');
    Cookies.remove('MedPoints_PublicKey');
    window.location.reload();
}

function logIn(walletId, walletKey) {
    Cookies.set('MedPoints_PrivateKey', walletId);
    Cookies.set('MedPoints_PublicKey', walletKey);
    window.location.reload();
}