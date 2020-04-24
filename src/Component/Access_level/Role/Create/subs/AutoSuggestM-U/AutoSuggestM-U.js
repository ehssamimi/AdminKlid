import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function AutoSuggestMU(props) {
    let {error,name,getnamefromOption}=props;
    // console.log(error)

    const [open, setOpen] = React.useState(false);
    const [defaultValue, setdefaultValue] = React.useState([]);
    const [options, setOptions] = React.useState([]);
    const [inputValue, setinputValue] = React.useState('a');
    const loading = open && options.length === 0;


    const handelChange = async (event) => {
        let {value} = event.target;
        setinputValue(value);
        let parents = await props.getOption(inputValue);
        setOptions(parents);
    };

    React.useEffect(() => {
        console.log('useEffect')

        let active = true;

        if (!loading) {
            return undefined;
        }

        async function getOptionFromParent() {
            let parents = await props.getOption(inputValue);
            setOptions(parents);

        }
        getOptionFromParent()

        return () => {
            active = false;
        };
    }, [loading]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open] );

    React.useEffect(() => {

        setdefaultValue(props.DefaultValue );

    },[props.DefaultValue] );



    return (


        <Autocomplete
            multiple
            id={name}
            className={"col-12 m-2 ltr"}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            getOptionSelected={(option, value) => option[`${getnamefromOption}`] === value[`${getnamefromOption}`]}
            getOptionLabel={(option) => option[`${getnamefromOption}`]}
            options={options}
            loading={loading}

            value={defaultValue}
            onChange={(event, newValue) => {
                setdefaultValue(newValue);
                props.GetValues(newValue, name);
            }}

            renderInput={(params) => (
                <TextField
                    {...params}
                    error={error.length>2?true:false}
                    helperText={error.length>2? error :""}
                    label={name}
                    onChange={handelChange}
                    variant="outlined"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20}/> : null}
                                {params.InputProps.endAdornment}

                            </React.Fragment>
                        ),
                    }}
                />


            )}


        />

    );

}