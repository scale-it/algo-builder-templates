from pyteal import *

def approval_program():
    app_manager = Bytes("app_manager")
    total_registered = Bytes("total_registered")
    escrow = Bytes("escrow")
    # verify rekey_to and close_rem_to are set as zero_address
    basic_checks = And(
        # Always verify that the RekeyTo property of any transaction is set to the ZeroAddress
        # unless the contract is specifically involved in a rekeying operation.
        Txn.rekey_to() == Global.zero_address(),
        Txn.close_remainder_to() == Global.zero_address()
    )

    on_initialize = Seq([
        App.globalPut(app_manager, Txn.application_args[0]),
        App.globalPut(total_registered, Int(0)),
        Return(Int(1))
    ])

    on_update_escrow = Seq([
        basic_checks,
        Asser(
            Txn.sender() == App.globalGet(app_manager)
        ),
        App.globalPut(escrow, Txn.application_args[1]),
        Return(Int(1))
    ])

    on_register = Seq([
        basic_checks,
        Gtxn[0].type_enum() == TxnType.AssetTransfer,
        Gtxn[0].asset_amount() == Int(1),
        Gtxn[0].xfer_asset() == Tmpl.Int("TMPL_WARCRAFT_TOKEN"),
        Gtxn[0].asset_receiver() == App.globalGet(escrow),
        App.localPut(Int(0), Bytes("warcraft"), Int(1)),
        App.globalPut(total_registered, Add(App.globalGet(total_registered), Int(1))),
        Return(Int(1))
    ])

    program = Cond(
        # Verfies that the application_id is 0, jumps to on_initialize.
        [Txn.application_id() == Int(0), on_initialize],
        # Verifies Update transaction, rejects it.
        [Txn.on_completion() == OnComplete.UpdateApplication, Return(Int(0))],
        # Verifies delete transaction, rejects it.
        [Txn.on_completion() == OnComplete.DeleteApplication, Return(Int(0))],
        # Verifies closeout transaction, approves it.
        [Txn.on_completion() == OnComplete.CloseOut, Return(Int(1))],
        # Verifies opt-in transaction, registration conditions.
        [Txn.on_completion() == OnComplete.OptIn, on_register],
        [Txn.application_args[0] == Bytes("update_escrow"), on_update_escrow],
    )

    return program

if __name__ == "__main__":
    print(compileTeal(approval_program(), Mode.Application, version=3))
