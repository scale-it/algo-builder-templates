# Contract Account
from pyteal import *

def escrow_contract():
    '''
    This contract represents an escrow account which receives warcraft tokens.
    '''
    # verify neither transaction
    # contains a rekey and close remainder to is set to zero address
    commons_checks = And(
        Txn.rekey_to() == Global.zero_address(),
        Txn.close_remainder_to() == Global.zero_address(),
    )

    program = And(
        commons_checks,
        Gtxn[1].type_enum() == TxnType.ApplicationCall,
        Gtxn[1].application_id() == Tmpl.Int("TMPL_APPLICATION_ID"),
        Gtxn[1].sender == Gtxn[0].asset_sender()
    )

    return program

if __name__ == "__main__":
    print(compileTeal(escrow_contract(), Mode.Signature))
