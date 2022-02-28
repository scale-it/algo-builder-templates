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
        Txn.asset_close_to() == Global.zero_address()
    )

    # Opt-in transaction
    # Note: we are checking that first transaction is payment with amount 0
    # and sent by store manager, because we don't want another
    # user to opt-in too many asa/app and block this address
    opt_in = And(
        Gtxn[0].type_enum() == TxnType.Payment,
        Gtxn[0].amount() == Int(0),
        Gtxn[0].sender() == Tmpl.Addr("TMPL_MANAGER"),
        Gtxn[1].type_enum() == TxnType.AssetTransfer,
        Gtxn[1].asset_amount() == Int(0)
    )

    register = And(
        commons_checks,
        Gtxn[0].type_enum() == TxnType.AssetTransfer,
        Gtxn[1].type_enum() == TxnType.ApplicationCall,
        Gtxn[1].application_id() == Tmpl.Int("TMPL_APPLICATION_ID"),
        Gtxn[1].sender() == Gtxn[0].asset_sender()
    )

    pay = And(
        commons_checks,
        Txn.type_enum() == TxnType.AssetTransfer,
        Txn.asset_amount() > Int(0)
    )

    opt_in_or_register = Or(opt_in, register)

    program = Cond(
        [Global.group_size() == Int(2), opt_in_or_register],
        [Global.group_size() == Int(1), pay]
    )

    return program

if __name__ == "__main__":
    print(compileTeal(escrow_contract(), Mode.Signature))
